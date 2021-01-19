class GameController < ApplicationController
  def create
    game = GameGenerator.new
    render json: {
      code: game.code,
      player: 1,
      words: game.words.map { |word| { value: word.value, identity: word.identity1 } }
    }
  end

  def load
    game = Game.find_by(code: params[:code].upcase)
    render json: {
      code: game.code,
      player: 2,
      words: game.words.map { |word| { value: word['value'], identity: word['identity2'] } }
    }
  end
end
