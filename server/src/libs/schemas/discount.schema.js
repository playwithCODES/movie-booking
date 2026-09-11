import { z } from "zod";

const baseDiscountRuleSchema = z.object({
  name: z.string({
    error: "Please enter discount name",
  }),

  discountPercentage: z.number({
    error: "Please enter discount percentage",
  }),

  showIds: z.array(
    z.string({
      error: "Enter show id",
    })
  ),

  startDate: z.coerce.date({
    error: "Start Date is needed",
  }),

  endDate: z.coerce.date({
    error: "End date is needed",
  }),
});

const discountRuleSchema = baseDiscountRuleSchema.refine(
  (data) => data.endDate >= data.startDate,
  {
    message: "End date cannot be before start date",
    path: ["endDate"],
  }
);

const updateDiscountRuleSchema = baseDiscountRuleSchema
  .partial()
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      data.endDate >= data.startDate,
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

export {
  discountRuleSchema,
  updateDiscountRuleSchema,
};