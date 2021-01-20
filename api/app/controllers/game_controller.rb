class GameController < ApplicationController
  def create
    game = GameGenerator.new
    render json: {
      code: game.code,
      player: 1,
      words: game.words.map do |word|
        {
          value: word.value,
          identity1: word.identity1,
          # identity2: word.p2_guessed ? word.identity2 : nil
        }
      end
    }
  end

  def load
    game = Game.find_by(code: params[:code].upcase)
    render json: {
      code: game.code,
      player: 2,
      words: game.words.map do |word|
        {
          value: word['value'],
          identity2: word['identity2']
        }
      end
    }
  end

  def guess
    word = Word.find_by(value: guess_params['word'], game_code: guess_params['code'])
    player = guess_params['player'].to_i
    # update saved data with guess
    word.update("p#{player}_guessed" => true)
    # tell the other player what their guess revealed
    identity = player.eql?(1) ? word.identity2 : word.identity1
    # TODO: add round limit + miss limit rules
    # TODO: reveal all agents on loss
    word.game.destroy if identity.eql?('assassin')
    # TODO: switch current player if there are other clues to give
    # game.update(current_player_turn: player.eql?(1) ? 2 : 1) if !identity.eql?('agent')
    render json: word
  end

  private

  def guess_params
    params.require(:game).permit(:code, :player, :word)
  end
end
