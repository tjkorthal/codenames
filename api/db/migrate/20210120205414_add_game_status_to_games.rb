class AddGameStatusToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :status, :string, default: 'in progress'
  end
end
