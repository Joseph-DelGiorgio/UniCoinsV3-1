UNCollaboration: A Collaborative Platform for Volunteers


This code defines two smart contracts: UNCollaboration and UNBadge. These contracts are designed to handle a collaboration platform, where volunteers can work on tasks and earn tokens, propose projects, and receive badges as rewards.

UNCollaboration contract:

Inherits from OpenZeppelin's ERC20, Ownable, and ReentrancyGuard contracts.
Defines various structs to store information about tasks, badges, balances, staking positions, and project proposals.
Implements functionality for project managers to add tasks and mint tokens.
Implements functionality for volunteers to complete tasks, stake tokens, and propose projects.
Implements functionality for project managers to validate project proposals, update project deliverables, and forfeit staked tokens if deliverables are not met.
Allows the contract owner to set the staking fee percentage.
Emits various events to track the state of tasks, volunteers, project managers, and other actions.

UNBadge contract:

Inherits from OpenZeppelin's ERC721 and Ownable contracts.
Defines a struct to store information about badges.
Implements functionality for minting badges with specific hours contributed and level.
Implements functionality for querying badge data based on the token ID.
Implements functionality for burning badges.

Features: 
Adding tasks with a description and a reward amount
Completing tasks and rewarding volunteers with UNicoin tokens
Adding and awarding badges to volunteers who have contributed a certain number of hours to a project
Adding volunteers and project managers
Minting UNicoin tokens by project managers
Proposing projects and staking UNicoin tokens to validate the proposal
Validating and updating project deliverables
Forfeiting staked UNicoin tokens if the project deliverables are not met
Data Structures
The contract defines the following data structures:

CollaborationTask: Contains information about a task, such as the project manager who created it, the description, the reward amount, the volunteer who completed it, and whether it has been completed or not.
Badge: Contains information about a badge, such as the description and the number of hours contributed by a volunteer.
UNicoinBalance: Contains information about a volunteer's UNicoin balance, including the balance amount, the badges earned, and the hours contributed to projects.
StakingPosition: Contains information about a staking position, such as the staker, the staked amount, the start time, and the end time.
ProjectProposal: Contains information about a project proposal, such as the proposer, the description, the staked amount, and whether it has been validated and its deliverables met.
Dependencies
The contract uses the following dependencies:

ERC20: OpenZeppelin contract for the ERC20 token standard
ERC721: OpenZeppelin contract for the ERC721 token standard
SafeMath: OpenZeppelin library for safe arithmetic operations
ReentrancyGuard: OpenZeppelin contract for preventing reentrant calls
Ownable: OpenZeppelin contract for contract ownership
Events: 
The contract emits the following events:

TaskAdded: Fired when a new task is added
TaskCompleted: Fired when a task is completed
VolunteerAdded: Fired when a new volunteer is added
ProjectManagerAdded: Fired when a new project manager is added
TokensMinted: Fired when UNicoin tokens are minted
StakingFeePercentageChanged: Fired when the staking fee percentage is changed
ProjectProposalAdded: Fired when a new project proposal is added
ProjectProposalValidated: Fired when a project proposal is validated
ProjectDeliverablesUpdated: Fired when a project's deliverables are updated
ProjectStakeForfeited: Fired when a project's staked UNicoin tokens are forfeited


License: 
This contract is licensed under the UNLICENSED license.

Getting Started: 
To interact with this smart contract for the first time, follow these steps:

Deploy the UNBadge contract: Deploy the UNBadge contract first, as it will be required while deploying the UNCollaboration contract.
Deploy the UNCollaboration contract: Deploy the UNCollaboration contract with the UNBadge contract's address as a constructor parameter.
**(Optional) Add more project managers: If needed, the current project manager (the contract deployer) can add new project managers using the addProjectManager(address projectManager) function.
Add volunteers: As a project manager, you can add volunteers using the addVolunteer(address volunteer) function.
(Optional) Mint tokens for volunteers: Project managers can mint tokens for volunteers using the mintTokens(address receiver, uint256 amount) function.
Create tasks: As a project manager, you can create tasks using the addTask(string memory taskDescription, uint256 reward, address volunteer) function. Assign a volunteer to the task by providing their address.
Volunteers propose projects: As a volunteer, you can propose projects using the proposeProject(string memory projectDescription, uint256 stakingAmount) function. You need to have enough tokens in your balance to stake the specified amount.
Validate project proposals: As a project manager, validate project proposals using the validateProposal(uint256 proposalId, bool isValid) function.
Update project deliverables: As a project manager, update the project deliverables using the updateProjectDeliverables(uint256 proposalId, bool deliverablesMet) function.
Complete tasks: As a volunteer assigned to a task, complete the task using the completeTask(uint256 taskIndex) function.
Award badges: As a project manager, award badges to volunteers using the awardBadge(address volunteer, uint256 tokenId, string memory badgeDescription, uint256 hoursContributed) function.
You can also interact with other functions depending on your use case.

How to Stake: 
When proposing a project, the volunteer stakes a specified amount of tokens. Here's how you stake tokens when proposing a project:

Make sure you are a volunteer: You must be added as a volunteer by a project manager using the addVolunteer(address volunteer) function.
Ensure you have enough tokens: Check your token balance using the balanceOf(address account) function from the ERC20 contract. You need to have enough tokens in your balance to stake the specified amount.
Propose a project: As a volunteer, call the proposeProject(string memory projectDescription, uint256 stakingAmount) function, where projectDescription is a description of the project, and stakingAmount is the amount of tokens you want to stake. The specified amount of tokens will be transferred from your balance to the contract and will be locked as a stake.
The staked tokens will be returned to the proposer if the project deliverables are met, as determined by the project manager. If the deliverables are not met, the staked tokens will be forfeited (burned).
