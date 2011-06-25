class CreateSpecies < ActiveRecord::Migration
  def self.up
    create_table :species do |t|
      t.string :latin
      t.string :vernacular

      t.timestamps
    end
  end

  def self.down
    drop_table :species
  end
end
