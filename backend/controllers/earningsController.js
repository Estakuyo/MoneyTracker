const getEarnings = (req, res) => {
  try {
    return res.status(200).json({ message: "This is get earnings API" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addEarnings = (req, res) => {
  try {
    return res.status(200).json({ message: "This is add earnings API" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateEarnings = (req, res) => {
  try {
    return res.status(200).json({ message: "This is update earnings API" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteEarnings = (req, res) => {
  try {
    return res.status(200).json({ message: "This is delete earnings API" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { getEarnings, addEarnings, updateEarnings, deleteEarnings };
