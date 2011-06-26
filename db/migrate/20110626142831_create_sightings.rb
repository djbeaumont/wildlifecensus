class CreateSightings < ActiveRecord::Migration
  def self.up
    create_table :sightings do |t|
      t.datetime :occasion
      t.text :description
      t.string :photo
      t.decimal :lat
      t.decimal :long

      t.timestamps
    end
  end

  def self.down
    drop_table :sightings
  end
end
