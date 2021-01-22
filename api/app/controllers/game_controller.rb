class GameController < ApplicationController
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
    @game = Game.find_by(code: guess_params['code'])
    player = guess_params['player'].to_i

    head 401 and return unless @game.current_player_turn.eql?(player)

    render json: @game.toggle_current_player
  end

  def guess
    word = Word.find_by(value: guess_params['word'], game_code: guess_params['code'])
    player = guess_params['player'].to_i
    head 401 and return unless word.game.current_player_turn.eql?(player)

    GuessWord.new(
      word: word,
      game_code: guess_params['code'],
      player: player
    ).call
    head 200
  end

  private

  def guess_params
    params.require(:game).permit(:code, :player, :word)
  end
end
