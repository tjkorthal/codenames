class GameController < ApplicationController
  def create
    game = Game.new
    render json: {
      code: game.code,
      player: 1,
      words: game.words.map { |word| { value: word.value, identity: word.identity1 } }
    }
  end
end
