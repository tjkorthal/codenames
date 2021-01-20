class GameGenerator
  attr_reader :words, :code

  def initialize
    values = WordBank.select(:value).order('random()').limit(25).map(&:value)
    @code = CodeGenerator.code
    Game.create(code: @code)
    words = values.map { |value| Word.new(value: value, game_code: @code) }
    words.each_with_index do |word, index|
      case index
      when 0
        word.identity1 = :assassin
        word.identity2 = :agent
      when 1..5
        word.identity1 = :bystander
        word.identity2 = :agent
      when 6..8
        word.identity1 = :agent
        word.identity2 = :agent
      when 9..13
        word.identity1 = :agent
        word.identity2 = :bystander
      when 14
        word.identity1 = :agent
        word.identity2 = :assassin
      when 15
        word.identity1 = :bystander
        word.identity2 = :assassin
      when 16
        word.identity1 = :assassin
        word.identity2 = :assassin
      when 17..23
        word.identity1 = :bystander
        word.identity2 = :bystander
      when 24
        word.identity1 = :assassin
        word.identity2 = :bystander
      end
    end
    @words = words.shuffle.each(&:save!)
  end
end
