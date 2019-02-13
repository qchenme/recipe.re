module Types
  class FoodType < Types::BaseObject  
    graphql_name "Food"
    description "Food object"

    field :id, ID, "Unique id of the food", null: false
    field :name, String, "Name of the product", null: false
  end
end
