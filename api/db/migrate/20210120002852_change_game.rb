class ChangeGame < ActiveRecord::Migration[6.1]
  def change
    remove_column :games, :words, :jsonb
  end
end
