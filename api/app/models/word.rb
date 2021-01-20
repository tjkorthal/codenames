# frozen_string_literal: true

# A word that corresponds to an agent, assassin, or bystander for P1 and P2
class Word < ApplicationRecord
  belongs_to :game, primary_key: :code, foreign_key: :game_code
end
