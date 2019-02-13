module Mutations
  class AddFood <  Mutations::BaseMutation
    null true

    argument :name, String, required: true
    argument :is_low_stock, Boolean, required: false, default_value: false

    field :food, Types::FoodType, null: true
    field :errors, [String], null: false

    def resolve(name:, is_low_stock:)
      food = Food.new(name: name, is_low_stock: is_low_stock)
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