class GameController < ApplicationController
  before_action :find_game, only: [:end_turn, :guess]

  def create
    generator = GameGenerator.new
    render json: {
      code: generator.code,
      player: generator.game.current_player_turn,
      game_status: generator.game.status,
      words: generator.words.map do |word|
        {
          value: word.value,
          identity1: word.identity1
        }
      end
    }
  end

  def load
    @game = Game.find_by(code: params['code'])
    render json: {
      code: @game.code,
      player: 2,
      game_status: @game.status,
      words: @game.words.map do |word|
        {
          value: word['value'],
          identity2: word['identity2']
        }
      end
    }
  end

  def end_turn
    player = guess_params['player'].to_i

    head 401 and return unless @game.current_player_turn.eql?(player)

    render json: @game.toggle_current_player
  end

  # TODO: move this out of the controller. This is messy
  def guess
    word = Word.find_by(value: guess_params['word'], game_code: guess_params['code'])
    player = guess_params['player'].to_i
    head 401 and return unless word.game.current_player_turn.eql?(player)

    # update saved data with guess
    word.update("p#{player}_guessed" => true)
    # tell the other player what their guess revealed
    identity = player.eql?(1) ? word.identity2 : word.identity1
    # TODO: add round limit + miss limit rules
    # TODO: reveal all agents on loss
    # TODO: only switch player if there are other clues to give
    @game.toggle_current_player unless identity.eql?('agent')
    if identity.eql?('assassin')
      @game.update(status: 'Mission failed')
      @game.destroy
    end
    payload = { game: @game }
    unless identity.eql?('bystander')
      # pretend they're the same so they show up the same on both screens
      word.identity1 = identity
      word.identity2 = identity
      payload.tap do |hash|
        hash[:word] = word
      end
    end
    ActionCable.server.broadcast("game_#{@game.code}", payload)
    render json: {
      word: word,
      game: @game
    }
  end

  private

  def find_game
    @game = Game.find_by(code: guess_params['code'])
  end

  def guess_params
    params.require(:game).permit(:code, :player, :word)
  end
end
