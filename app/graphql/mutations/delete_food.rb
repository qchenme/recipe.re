module Mutations
  class DeleteFood <  Mutations::BaseMutation
    null true

    argument :id, ID, required: true

    field :food, Types::FoodType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      food = Food.find(id)
      food.destroy
      {
        food: food,
        errors: []
      }
    end
  end
end