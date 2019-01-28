require 'http'

require_relative 'photographers_gallery_event_parser'

module PhotographersGalleryFetcher
  def self.base_url
    'https://thephotographersgallery.org.uk/views/ajax'
  end

  def self.fetch
    json_response = HTTP.post(
      base_url,
      headers: {
        accept: 'application/json'
      },
      form: {
        field_paragraphs_event_type_tid: 2,
        field_event_for_tid:             'All',
        view_name:                       'whats_on',
        view_display_id:                 'now_upcoming_view_page',
        view_path:                       'whats-on/now-upcoming',
        view_base_path:                  'whats-on/now-upcoming',
      },
    ).parse

    events = PhotographersGalleryEventParser.parse(json_response)

    events
  end
end
