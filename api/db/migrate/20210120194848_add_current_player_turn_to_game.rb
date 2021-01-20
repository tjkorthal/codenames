class AddCurrentPlayerTurnToGame < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :current_player_turn, :integer, default: 1
  end
end
