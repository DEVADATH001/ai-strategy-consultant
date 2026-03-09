# 🚀 AI Strategy Consultant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An innovative web application that leverages the power of Google's Gemini API to act as your personal AI-powered strategy consultant. This tool can analyze a company, identify potential business challenges, and generate a comprehensive strategic report with actionable insights and solutions.

## ✨ Key Features

- **AI-Powered Analysis:** Simply enter a company name, and the AI will identify its core business, potential problems, and strategic opportunities.
- **Strategic Report Generation:** Automatically produces a detailed report covering various aspects of business strategy.
- **Data Visualization:** Includes a dynamic **Score Gauge** to provide an at-a-glance assessment of the generated strategy's potential.
- **Interactive UI:** A clean and modern interface built with React and Vite for a seamless user experience.
- **Rich Content Display:** The generated report is parsed and displayed in a structured and easy-to-read format.

## ⚙️ How It Works

1.  **Input:** The user enters a company name into the input form.
2.  **AI Processing:** The application sends the company name to the Google Gemini API with a sophisticated prompt, asking it to perform a strategic analysis.
3.  **Report Generation:** The Gemini API processes the request, analyzes the company, and generates a detailed report in Markdown format.
4.  **Display:** The application parses the Markdown report and displays it in a structured, visually appealing `ReportView`, complete with a `ScoreGauge` that visualizes a key metric from the report.

## 🎥 Demo

A video demonstrating the full functionality of the project can be found [here](link-to-your-video).

*(Note: The original demo video, `simple.mp4`, is not included in this repository due to its size. It is recommended to use Git LFS or host the video externally.)*

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **API:** [Google Gemini API](https://ai.google.dev/)
- **UI Components:** [recharts](https://recharts.org/) for charts, [lucide-react](https://lucide.dev/) for icons.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- An active [Google Gemini API Key](https://ai.google.dev/tutorials/get_started_web)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DEVADATH001/ai-strategy-consultant.git
    cd ai-strategy-consultant
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure your environment:**
    - Create a new file in the root directory named `.env.local`.
    - Add your Gemini API key to this file:
      ```
      GEMINI_API_KEY=your_gemini_api_key_here
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
