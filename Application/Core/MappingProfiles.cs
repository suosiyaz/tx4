using Application.HotNewses;
using Application.Users;
using Application.WorkOrders;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<WorkOrder, WorkOrder>();
            CreateMap<UserCreateDto, AppUser>();
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<WorkOrderCreateDto, WorkOrder>();
            CreateMap<WorkOrderReconfigureDto, WorkOrder>();
            CreateMap<WorkOrderHistory, WorkOrderHistoryDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.UserName))
                .ForMember(d => d.Job, o => o.MapFrom(s => s.WorkOrder.Job))
                .ForMember(d => d.Team, o => o.MapFrom(s => s.User.Team));
            CreateMap<WorkOrder, WorkOrderDetailDto>();
            CreateMap<WorkOrder, WorkOrderDto>()
                .ForMember(d => d.Aged, o => o.MapFrom(s => (s.CompletionDate != null && s.DateReleased != null) ? (int)(s.CompletionDate - s.DateReleased).Value.Days : 0 ))
                .ForMember(d => d.SLABreached, o => o.MapFrom(s => (s.CompletionDate != null && s.DateReleased != null) ? (int)(s.CompletionDate - s.DateReleased).Value.Days >= 10 ? true : false : false));

            CreateMap<HotNews, HotNewsDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.FirstName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName));
            CreateMap<AppUser, UserDto>();
        }
    }
}