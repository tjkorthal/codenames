class ChangeRevealColumnsForWords < ActiveRecord::Migration[6.1]
  def change
    change_table :words do |t|
      t.remove :reveal_for_p1
      t.remove :reveal_for_p2
      t.string :reveal
    end
  end
end
