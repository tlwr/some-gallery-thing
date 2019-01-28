require 'time'
require 'json'

class Event
  attr_reader :title, :location, :url, :start_date, :end_date

  def initialize(title, start_date, end_date)
    @title      = title
    @start_date = start_date
    @end_date   = end_date
  end

  def to_json(*options)
    {
      title:      title,
      start_date: start_date,
      end_date:   end_date,
    }.to_json
  end
end
