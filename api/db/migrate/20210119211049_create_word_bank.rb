class CreateWordBank < ActiveRecord::Migration[6.1]
  def change
    create_table :word_bank do |t|
      t.string :value

      t.timestamps
    end
  end
end
