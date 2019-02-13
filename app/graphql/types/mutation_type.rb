module Types
  class MutationType < Types::BaseObject
    description "Root mutation"
    
    field :add_food, mutation: Mutations::AddFood, description: "Add a new food"
    field :update_food, mutation: Mutations::UpdateFood, description: "Update existing food name"
    field :delete_food, mutation: Mutations::DeleteFood, description: "Delete the food"
  end
end
