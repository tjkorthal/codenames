# generates a 4 letter code based on the same seed to avoid collisions
# TODO: determine if this is actually useful, or if I can inline the code
# generation
class CodeGenerator
  @@seed = Random.new
  LETTERS = ('A'..'Z').to_a.freeze

  def self.code
    LETTERS[@@seed.rand(26)] + LETTERS[@@seed.rand(26)] +
      LETTERS[@@seed.rand(26)] + LETTERS[@@seed.rand(26)]
  end
end
