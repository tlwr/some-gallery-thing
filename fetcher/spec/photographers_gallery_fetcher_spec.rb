require_relative "#{PROJECT_PATH}/src/photographers_gallery_fetcher"

context 'Photographers Gallery Fetcher' do
  it 'fetches the events' do
    events = PhotographersGalleryFetcher.fetch

    expect(events.length).to_not eq(0)
  end
end
