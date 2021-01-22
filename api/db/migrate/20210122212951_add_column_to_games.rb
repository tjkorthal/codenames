class AddColumnToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :turns_remaining, :integer, default: 9
  end
end
