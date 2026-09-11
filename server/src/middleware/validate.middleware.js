const validate = (schema, source = "body") => {
    return (req, res, next) => {

        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return next(result.error);
        }

        if (source === "query") {
            Object.assign(req.query, result.data);
        } else {
            req[source] = result.data;
        }

        next();
    };
};

export default validate;