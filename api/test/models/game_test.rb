require 'test_helper'

class GameTest < ActiveSupport::TestCase
  test 'words are unique' do
    game = Game.new
    assert_equal game.words.map(&:value).uniq.size, 25
  end
  test '3 assassins for P1' do
    game = Game.new
    assassins = game.words.select { |word| word.identity1.eql? :assassin }
    assert_equal assassins.size, 3
  end

  test '3 assassins for P2' do
    game = Game.new
    assassins = game.words.select { |word| word.identity2.eql? :assassin }
    assert_equal assassins.size, 3
  end

  test '9 agents for P1' do
    game = Game.new
    agents = game.words.select { |word| word.identity1.eql? :agent }
    assert_equal agents.size, 9
  end

  test '9 agents for P2' do
    game = Game.new
    agents = game.words.select { |word| word.identity2.eql? :agent }
    assert_equal agents.size, 9
  end

  test '13 bystanders for P1' do
    game = Game.new
    bystanders = game.words.select { |word| word.identity1.eql? :bystander }
    assert_equal bystanders.size, 13
  end

  test '13 bystanders for P2' do
    game = Game.new
    bystanders = game.words.select { |word| word.identity2.eql? :bystander }
    assert_equal bystanders.size, 13
  end

  test '1 assassin overlap' do
    game = Game.new
    both_assassins = game.words.select do |word|
      word.identity1.eql?(:assassin) && word.identity2.eql?(:assassin)
    end
    assert_equal both_assassins.size, 1
  end

  test '1 assassin is P1 agent' do
    game = Game.new
    identities = game.words.select do |word|
      word.identity1.eql?(:agent) && word.identity2.eql?(:assassin)
    end
    assert_equal identities.size, 1
  end

  test '1 assassin is P2 agent' do
    game = Game.new
    identities = game.words.select do |word|
      word.identity1.eql?(:assassin) && word.identity2.eql?(:agent)
    end
    assert_equal identities.size, 1
  end

  test '1 assassin is P1 bystander' do
    game = Game.new
    identities = game.words.select do |word|
      word.identity1.eql?(:bystander) && word.identity2.eql?(:assassin)
    end
    assert_equal identities.size, 1
  end

  test '1 assassin is P2 bystander' do
    game = Game.new
    identities = game.words.select do |word|
      word.identity1.eql?(:assassin) && word.identity2.eql?(:bystander)
    end
    assert_equal identities.size, 1
  end

  test '3 agents overlap' do
    game = Game.new
    both_agents = game.words.select do |word|
      word.identity1.eql?(:agent) && word.identity2.eql?(:agent)
    end
    assert_equal both_agents.size, 3
  end
end
