try:
	from googlesearch import search
except ImportError: 
	print("No module named 'google' found")

# to search
queryString = """
Personalized Investment Strategies based on Risk Tolerance
Creating a Financial Roadmap for Life Goals
Asset Allocation Techniques for Diversification
Maximizing Savings with Effective Money Management
Optimizing Retirement Income Streams
Planning for Healthcare Costs in Retirement
Navigating Market Volatility: Tips for Long-Term Investors
Utilizing Tax-Advantaged Accounts for Retirement Savings
Financial Wellness Programs for Employee Benefits
Strategies for College Savings and Education Funding
Behavioral Finance: Understanding and Overcoming Biases
Implementing Sustainable Spending Habits for Long-Term Financial Stability
Balancing Short-Term and Long-Term Financial Goals
Planning for Unexpected Life Events: Insurance and Contingency Funds
Estate Distribution Strategies to Minimize Tax Implications
Financial Planning for Entrepreneurs and Small Business Owners
Managing Windfalls: Inheritance and Lottery Winnings
Assessing and Mitigating Investment Risks
Legacy Planning: Charitable Giving and Philanthropy
Personal Finance Apps and Tools for Simplified Money Management"""

queryArray = queryString.split("\n")

urlArray = [] 
for q in queryArray[1:] : 
    urlArray.append(next(search(q, tld="co.in", num=10, stop=10, pause=2)))

print(urlArray)
