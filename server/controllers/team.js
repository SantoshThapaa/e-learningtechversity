import Team from '../models/TeamModel.js';

export const addTeamMember = async (req, res) => {
  const { name, role, facebook, linkedin, twitter } = req.body;
  const image = req.file ? req.file.path : ''; 

  try {
    const newTeam = new Team({
      name,
      role,
      image,
      facebook: facebook || null,
      linkedin: linkedin || null,
      twitter: twitter || null,
    });

    await newTeam.save();

    res.status(200).json({ message: 'Team member added successfully', team: newTeam });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add team member' });
  }
};

export const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  try {
    const teamMember = await Team.findByIdAndDelete(id);

    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member deleted successfully', team: teamMember });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

export const updateTeamMember = async (req, res) => {
  const { name, role, facebook, linkedin, twitter, existingImage } = req.body;
  const image = req.file ? req.file.path : existingImage;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        image,
        facebook: facebook || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
      },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member updated successfully', team: updatedTeam });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team member' });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.status(200).json(teamMembers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};
