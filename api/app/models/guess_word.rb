class GuessWord
  def initialize(word:, game_code:, player:)
    @word = word
    @game_code = game_code
    @player = player
    @game = word.game
  end

  def call
    identity = word.send(revealed_identity)

    handle_agent if identity.eql?('agent')
    handle_assassin if identity.eql?('assassin')
    handle_bystander if identity.eql?('bystander')
  end

  private

  attr_reader :word, :game_code, :player, :game

  # all agents have been revealed
  def all_agents_found?
    game.words.count { |word| word.reveal.eql?('agent') }.eql?(15)
  end

  # all of the current player's words have already been revealed
  def no_agents_remaining?
    game.words.count { |word| word.reveal.eql?(word.send("identity#{player}")) }.eql?(9)
  end

  def handle_agent
    word.update(reveal: 'agent')
    if all_agents_found?
      game.update(status: 'Mission success')
      game.destroy
    end
    ActionCable.server.broadcast("game_#{game_code}", { game: game, word: word })
  end

  def handle_assassin
    # TODO: reveal all agents on loss
    word.update(reveal: 'assassin')
    game.update(status: 'Mission failed')
    game.destroy
    ActionCable.server.broadcast("game_#{game_code}", { game: game, word: word })
  end

  def handle_bystander
    # TODO: add round limit + miss limit rules
    # TODO: reveal all agents on loss
    # only switch player if there are other clues to give
    @game.toggle_current_player unless no_agents_remaining?
    # FIXME: no longer reveals bystanders on guess
    ActionCable.server.broadcast("game_#{game_code}", { game: game })
  end

  def revealed_identity
    player.eql?(1) ? :identity2 : :identity1
  end
end
