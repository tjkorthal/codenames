# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :words, primary_key: :code, foreign_key: :game_code, dependent: :delete_all

  def toggle_current_player
    next_turn = current_player_turn.eql?(1) ? 2 : 1
    update(current_player_turn: next_turn)
  end
end
