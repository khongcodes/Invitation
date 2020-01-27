class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.string :location
      t.string :time
      t.integer :date
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
