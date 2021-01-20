class CreateWord < ActiveRecord::Migration[6.1]
  def change
    create_table :words do |t|
      t.string :game_code, null: false
      t.string :value, null: false
      t.string :identity1, null: false
      t.string :identity2, null: false
      t.boolean :p1_guessed, default: false
      t.boolean :p2_guessed, default: false

      t.timestamps
    end
  end
end
