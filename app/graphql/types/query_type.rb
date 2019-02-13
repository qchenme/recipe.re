module Types
  class QueryType < Types::BaseObject
    description "Root query"

    # Fetch all food
    field :allFood, [FoodType], null: false do
      description "Get all food"
    end

    def all_food()
      Food.all
    end
    
  end
end
