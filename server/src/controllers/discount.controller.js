import discountService from "../services/discount.service.js";

const createDiscount = async (req, res) => {
  try {
    const createdDiscount = await discountService.createDiscount(req.body);
    res.json(createdDiscount);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const getAllDiscountList = async (req, res) => {
  try {
    const discountRulesList = await discountService.getAllDiscountList();
    res.json(discountRulesList);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const findDiscountRuleById = async (req, res) => {
  try {
    const discountRule = await discountService.findDiscountRuleById(
      req.params.id,
    );
    res.json(discountRule);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const updateDiscountRuleById = async (req, res) => {
  try {
    const updatedDiscountRule = await discountService.updateDiscountRuleById(
      req.params.id,
      req.body,
    );
    res.json(updatedDiscountRule);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const deleteDiscountRuleById = async (req, res) => {
  try {
    const result = await discountService.deleteDiscountRuleById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

export default {
  createDiscount,
  getAllDiscountList,
  findDiscountRuleById,
  updateDiscountRuleById,
  deleteDiscountRuleById,
};
