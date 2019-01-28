require_relative "#{PROJECT_PATH}/src/photographers_gallery_event_parser"

PHOTOGRAPHERS_GALLERY_FIX_1 = json_fixture('photographers_gallery_1.json')

context 'Photographers Gallery Parser' do
  events = PhotographersGalleryEventParser.parse(PHOTOGRAPHERS_GALLERY_FIX_1)

  it 'parses the correct number of events' do
    expect(events.length).to equal(3)
  end

  it 'parses titles correctly' do
    events.map(&:title).each do |title|
      expect(title).to match(
        /Arno Schidlowski: Inner Skies/
      ).or match(
        /Roman Vishniac Rediscovered/
      ) .or match(
        /All I Know Is What’s On The Internet/
      )
    end
  end

  it 'parses titles correctly' do
    events.each do |event|
      expect(event.start_date.class).to eq(Date)
      expect(event.end_date.class).to   eq(Date)
    end
  end

  it 'parses events correctly' do
    expect(events[0].title).to match(/Arno Schidlowski: Inner Skies/)
    expect(events[0].start_date).to eq(Date.new(2019, 01, 10))
    expect(events[0].end_date).to   eq(Date.new(2019, 03, 02))

    expect(events[1].title).to match(/Roman Vishniac Rediscovered/)
    expect(events[1].start_date).to eq(Date.new(2018, 10, 26))
    expect(events[1].end_date).to   eq(Date.new(2019, 02, 24))

    expect(events[2].title).to match(/All I Know Is What’s On The Internet/)
    expect(events[2].start_date).to eq(Date.new(2018, 10, 26))
    expect(events[2].end_date).to   eq(Date.new(2019, 02, 24))
  end

  it 'parses the start date for a single day event correctly' do
    expect(PhotographersGalleryEventParser.parse_start_date(
      'Thu 31 Jan 2019'
    )).to eq(Date.new(2019, 01, 31))
  end

  it 'parses the start date for a multi year event differently' do
    expect(PhotographersGalleryEventParser.parse_start_date(
      '26 Oct 2018 - 24 Feb 2019'
    )).to eq(Date.new(2018, 10, 26))
  end

  it 'parses the end date for a single day event correctly' do
    expect(PhotographersGalleryEventParser.parse_end_date(
      'Thu 31 Jan 2019'
    )).to eq(Date.new(2019, 01, 31))
  end

  it 'parses the end date for a multi year event differently' do
    expect(PhotographersGalleryEventParser.parse_end_date(
      '26 Oct 2018 - 24 Feb 2019'
    ).to_date).to eq(Date.new(2019, 02, 24))
  end
end
