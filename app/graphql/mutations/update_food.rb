module Mutations
  class UpdateFood <  Mutations::BaseMutation
    null true

    argument :id, ID, required: true
    argument :is_low_stock, Boolean, required: true

    field :food, Types::FoodType, null: true
    field :errors, [String], null: false

    def resolve(id:, is_low_stock:)
      food = Food.find(id)
     
      if food.update(is_low_stock: is_low_stock)
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