import DiscountRule from "../models/DiscountRule.js";

const createDiscount = async (data) => {
  const discount = await DiscountRule.create(data);
  return discount;
};

const getAllDiscountList = async () => {
  const discountList = await DiscountRule.find();
  return discountList;
};

const findDiscountRuleById = async (id) => {
  const discountList = await DiscountRule.findById(id);
  return discountList;
};

const updateDiscountRuleById = async (id, updatedData) => {
  const updatedDiscountRule = await DiscountRule.findByIdAndUpdate(
    id,
    updatedData,
    { new: true },
  );
  return updatedDiscountRule;
};

const deleteDiscountRuleById=async(id)=>{
    const deletedDiscountRule=await DiscountRule.findByIdAndDelete(id);
    return {message:"Discount rule has been deleted successfully"};
}

export default{
createDiscount,
getAllDiscountList,
findDiscountRuleById,
updateDiscountRuleById,
deleteDiscountRuleById
}
