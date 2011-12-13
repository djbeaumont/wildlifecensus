class FixPositionColumns < ActiveRecord::Migration
  def up
    rename_column :sightings, :lat, :latitude
    rename_column :sightings, :long, :longitude
  end

  def down
    rename_column :sightings, :latitude, :lat
    rename_column :sightings, :longitude, :long
  end
end
