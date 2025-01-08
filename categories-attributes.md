To make your category types more robust and flexible, you can consider adding specific fields for each category type that provide more context and functionality. Here’s a suggestion for the fields you can add to each category, as well as some additional category types that are useful when the filter cannot fully accommodate a particular use case.

### Fields for Existing Category Types

1. **Main**

   - **description**: A brief description of the main category, its purpose, or its key items.
   - **is-featured**: A boolean flag to indicate if this category should be featured or promoted on the website or app.
   - **display-order**: An integer for sorting categories on the user interface.

2. **Seasonal**

   - **start-date**: The date the seasonal category becomes active.
   - **end-date**: The date the seasonal category ends.
   - **season-name**: The name of the season (e.g., "Winter 2025", "Holiday 2024").
   - **is-recurring**: A boolean flag to indicate whether the season recurs annually or periodically.
   - **region**: Optionally specify a geographic region if the seasonal category applies to specific locations (e.g., "Winter in North America").
   - **promotion-code**: If there is a promotional code associated with seasonal products.

3. **Promotional**

   - **start-date**: The start date for the promotion.
   - **end-date**: The end date for the promotion.
   - **discount**: The discount percentage or value associated with the promotion.
   - **is-limited-stock**: A boolean flag to indicate if the promotion is valid while stocks last.
   - **minimum-purchase**: A value to specify if there's a minimum purchase amount required to access the promotion.
   - **promotion-type**: The type of promotion (e.g., "buy-one-get-one", "percentage-off", "flash-sale").

4. **Usage**

   - **target-audience**: The intended users or target audience for this category (e.g., "adults", "students", "teachers").
   - **use-case**: A description of the typical use case for the products in this category (e.g., "office use", "outdoor", "fitness").
   - **lifetime**: If applicable, an estimated product lifetime (e.g., "1 year", "3 months").

5. **Collection**
   - **collection-name**: The name of the collection (e.g., "Spring 2025 Collection").
   - **collection-theme**: The theme of the collection (e.g., "Luxury", "Sustainable", "Eco-friendly").
   - **designer**: Name of the designer or brand associated with the collection (if applicable).
   - **exclusive**: Boolean flag to indicate whether this collection is exclusive (e.g., "limited edition").
