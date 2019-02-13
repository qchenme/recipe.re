class CreateFoods < ActiveRecord::Migration[5.2]
  def change
    create_table :foods do |t|
      t.string :name
      t.boolean :is_low_stock, default: false
      t.timestamps
    end
  end
end
