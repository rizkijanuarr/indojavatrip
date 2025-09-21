import "./Testimonial.css"
import { useTranslation } from 'react-i18next';
import { testimonialData } from "../../data/testimonialData"

export default function Testimonial() {
    const { t } = useTranslation();
    
    // Duplicate data untuk seamless loop
    const duplicatedData = [...testimonialData, ...testimonialData];
    
    return (
        <div className="testimonial-grid">
            {duplicatedData.map((testimonial, index) => {
                // Determine which row (0-3 for 4 rows of 3 cards each)
                const rowNumber = Math.floor((index % testimonialData.length) / 3)
                // Row 1 & 3 (0,2): left, Row 2 & 4 (1,3): right
                const isLeftRow = rowNumber % 2 === 0
                const animationClass = isLeftRow ? 'slide-from-left' : 'slide-from-right'
                const delay = (index % 3) * 0.2 // 0s, 0.2s, 0.4s delay for each card in row
                
                return (
                    <div 
                        key={`${testimonial.id}-${Math.floor(index / testimonialData.length)}`} 
                        className={`testimonial-card ${animationClass}`}
                        style={{ animationDelay: `${delay}s` }}
                    >
                        <div className="testimonial-header">
                            <span className="testimonial-rating">{testimonial.rating}</span>
                        </div>
                        <div className="testimonial-content">
                            <p className="testimonial-text">
                                {testimonial.reviewKey ? t(testimonial.reviewKey) : testimonial.review}
                            </p>
                        </div>
                        <div className="testimonial-footer">
                            <div className="testimonial-author">
                                <span className="author-name">{testimonial.name}</span>
                                <span className="author-location">{testimonial.location}</span>
                            </div>
                            <div className="testimonial-avatar">
                                <img src={testimonial.avatar} alt={testimonial.name} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}