require 'json'

PROJECT_PATH  = File.expand_path(File.join(File.basename(__dir__), '..'))
FIXTURES_PATH = File.expand_path(File.join(File.basename(__dir__), 'fixtures'))

def fixture(filename)
  File.read(File.expand_path(File.join(FIXTURES_PATH, filename)))
end

def json_fixture(filename)
  JSON.parse(fixture(filename))
end

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

end
