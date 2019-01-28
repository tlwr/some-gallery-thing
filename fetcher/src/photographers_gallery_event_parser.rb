require 'chronic'
require 'nokogiri'

require_relative 'event'

module PhotographersGalleryEventParser
  def self.parse(json_response)
    raw_html = raw_html_from_json(json_response)
    rows     = row_html_from_raw_html(raw_html)
    events   = rows.map { |r| event_from_row(r) }
    events
  end

  def self.raw_html_from_json(json_response)
    json_response
      .select { |elem| elem.key?('data') && elem['command'] == 'insert' }
      .map    { |elem| elem.fetch('data') }
      .join("\n")
  end

  def self.row_html_from_raw_html(raw_html)
    Nokogiri::HTML(raw_html)
      .css('.views-row')
  end

  def self.event_from_row(row)
    title = row.at_css('.views-field.title .field-content a').text

    start_date = parse_start_date(
      row.at_css('.views-field.date .date-display-range').text
    )

    end_date = parse_end_date(
      row.at_css('.views-field.date .date-display-range').text
    )

    Event.new(
      title,
      start_date,
      end_date,
    )
  end

  def self.parse_start_date(date_str)
    year_regex     = /20\d{2}/
    weekdays       = %w(mon tue wed weds thu fri sat sun).map { |w| /#{w}/i }
    years          = date_str.scan(year_regex).map(&:to_i).sort
    earliest_year  = years.first
    sanitised_date = date_str
      .split('-').first.split(' ')
      .reject { |w| weekdays.any? { |d| w.match?(d) } }
      .join(' ')
      .gsub(/year_regex/, '')

    Chronic.parse("#{sanitised_date} #{earliest_year}").to_date
  end

  def self.parse_end_date(date_str)
    year_regex     = /20\d{2}/
    weekdays       = %w(mon tue wed weds thu fri sat sun).map { |w| /#{w}/i }
    years          = date_str.scan(year_regex).map(&:to_i).sort
    earliest_year  = years.last
    sanitised_date = date_str
      .split('-').last.split(' ')
      .reject { |w| weekdays.any? { |d| w.match?(d) } }
      .join(' ')
      .gsub(/year_regex/, '')

    Chronic.parse("#{sanitised_date} #{earliest_year}").to_date
  end
end
