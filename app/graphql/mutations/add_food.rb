module Mutations
  class AddFood <  Mutations::BaseMutation
    null true

    argument :name, String, required: true

    field :food, Types::FoodType, null: true
    field :errors, [String], null: false

    def resolve(name:)
      food = Food.new(name: name)
      if food.save
        {
          food: food,
          errors: [],
        }
      else
        {
          food: nil,
          errors: food.errors.full_messages
        }
      end
    end

  end
end