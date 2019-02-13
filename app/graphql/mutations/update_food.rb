module Mutations
  class UpdateFood <  Mutations::BaseMutation
    null true

    argument :id, ID, required: true
    argument :name, String, required: true

    field :food, Types::FoodType, null: true
    field :errors, [String], null: false

    def resolve(id:, name:)
      food = Food.find(id)
     
      if food.update(name: name)
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