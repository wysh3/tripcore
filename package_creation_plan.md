# Package Creation Implementation Plan

## 1. Implement "Pricing" Tab
- **Inputs Required:**
  - Selling Price (Number input)
  - Original Price (Number input, optional)
  - Discount/Savings Label (Text input, optional)

## 2. Implement "Itinerary" Tab
- **Inputs Required:**
  - Package PDF Brochure (URL input)
  - Day-wise Builder (Dynamic Array):
    - Day Number/Title
    - Duration
    - Description (Textarea)
  - Inclusion & Exclusion:
    - Inclusions (Textarea or dynamic list)
    - Exclusions (Textarea or dynamic list)
  - Cancellation Policy (Textarea)
  - Gallery Images (Comma-separated URL inputs or dynamic list)

## 3. Implement "Departures" Tab
- **Inputs Required:**
  - Departure Type (Select)
  - Departure Points (Text input)
  - Upcoming Departure Dates (Dynamic Array):
    - Start Date (Date input)
    - Seats Left (Number input)
    - Price Override (Number input)
