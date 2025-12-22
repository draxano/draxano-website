import { useState } from 'react'
import { projects } from '../../data/projects'
import Card from '../ui/Card'
import Modal from '../ui/Modal'
import './Projects.css'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="projects">
      <div className="container">
        <h1 className="page-title">Projects</h1>
        <div className="projects-grid">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card"
              onClick={() => openModal(project)}
            >
              {project.logo && (
                <div className="project-logo-container">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="project-logo"
                  />
                </div>
              )}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedProject} onClose={closeModal}>
        {selectedProject && (
          <div className="modal-header">
            {selectedProject.logo && (
              <div className="modal-project-logo">
                <img
                  src={selectedProject.logo}
                  alt={`${selectedProject.title} logo`}
                />
              </div>
            )}
            <h2 className="modal-project-title">{selectedProject.title}</h2>
            <div className="modal-project-technologies">
              {selectedProject.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <p className="modal-project-description">
              {selectedProject.detailedDescription || selectedProject.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Projects

