class ChangeGuessedToRevealForWords < ActiveRecord::Migration[6.1]
  def change
    rename_column :words, :p1_guessed, :reveal_for_p2
    rename_column :words, :p2_guessed, :reveal_for_p1
  end
end
