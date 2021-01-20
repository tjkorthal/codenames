class GameController < ApplicationController
  before_action :find_game, only: [:end_turn, :guess]

  def create
    game = GameGenerator.new
    render json: {
      code: game.code,
      player: 1,
      words: game.words.map do |word|
        {
          value: word.value,
          identity1: word.identity1
        }
      end
    }
  end

  def load
    @game = Game.find_by(code: guess_params['code'])
    render json: {
      code: @game.code,
      player: 2,
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
    @game.destroy if identity.eql?('assassin')
    # TODO: only switch player if there are other clues to give
    @game.toggle_current_player unless identity.eql?('agent')
    render json: word
  end

  private

  def find_game
    @game = Game.find_by(code: guess_params['code'])
  end

  def guess_params
    params.require(:game).permit(:code, :player, :word)
  end
end
