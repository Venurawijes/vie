# Lovable Project Remake Prompt: Thai Street Food POS

## Project Vision
Remake a restaurant POS system with a **premium, ultra-fast, and bug-free** user interface. The app must feel industrial-grade, highly responsive, and handle real-time order updates without manual refreshing. Use a modern "Dark Mode" as default with vibrant accents (e.g., Thai-inspired orange/gold/green).

## Core Pages & Hierarchy
1.  **Auth (Login)**: Secure login screen with persistent session management.
2.  **Dashboard (Branch Selection)**: A high-impact screen showing available branches as interactive cards. Once a branch is selected, redirect to the Order Management view for that branch.
3.  **Order Management (Live View)**: 
    -   A multi-tab or split-view interface showing "Pending", "In Preparation", and "Completed" orders.
    -   Detailed order cards showing `Table Number`, `Order ID`, `Items`, `Status`, and `Payment Status`.
    -   Real-time indicators (Status badges, timer for how long an order has been pending).
4.  **Order Details Drawer/Modal**: View full order details, item notes, and action buttons to change status.

## Technical Requirements
-   **Framework**: React with Vite, TypeScript, Tailwind CSS.
-   **Icons**: Lucide-react.
-   **Animations**: Framer Motion for smooth transitions between pages and state changes.
-   **API Integration**:
    -   Use Axios with a centralized `HttpService`.
    -   Implement an Authorization interceptor to attach Bearer tokens.
    -   Handle 401/403 errors gracefully (redirect to login).
-   **Real-time Updates (Socket.io)**:
    -   Connect to a WebSocket server on mount.
    -   Listen to branch-specific channels (e.g., `b${branchId}`).
    -   Automatically trigger data re-fetching or state updates when `ORDER_STATUS_UPDATED`, `ORDER_UPDATED`, or `NEW_ORDER_ADDED` events are received.
    -   **Critical**: Play an audio notification (`ding.mp3`) when a new order arrives.
-   **State Management**: Use React Context or TanStack Query (preferred) for seamless data fetching and caching.

## Design Aesthetics (Premium Feel)
-   Avoid generic browser components. Use custom-styled buttons, inputs, and cards.
-   Implement smooth micro-animations (hover effects, loading skeletons).
-   Use a consistent design system with well-defined spacing and typography (e.g., Inter or Outfit fonts).
-   Ensure the UI is responsive but optimized for tablet/desktop POS stations.

## Specific Logic to Replicate
-   Fallback Polling: Even with WebSockets, include a background refresh every 60 seconds to ensure data consistency.
-   Mute Toggle: Provide a way to mute/unmute audio notifications.
-   Calculation Logic: Ensure order totals, taxes, and service charges are calculated correctly following existing backend rules.

## The Goal
A seamless, real-time experience that eliminates the need for manual refreshes and provides a high-end look and feel that reflects a modern restaurant brand.
