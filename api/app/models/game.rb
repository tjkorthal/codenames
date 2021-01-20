# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :words, primary_key: :code, foreign_key: :game_code, dependent: :delete_all
end
